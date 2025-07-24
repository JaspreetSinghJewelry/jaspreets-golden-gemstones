import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const baseUrl = 'https://jaspreetsinghjewelry.com';
    const urlsToVisit = [baseUrl];
    const visited = new Set<string>();
    const contentBlocks: Array<{url: string, text: string}> = [];

    // Crawl the website
    while (urlsToVisit.length > 0 && visited.size < 20) { // Limit to prevent timeout
      const url = urlsToVisit.shift()!;
      if (visited.has(url) || !url.includes('jaspreetsinghjewelry.com')) {
        continue;
      }
      visited.add(url);

      try {
        const response = await fetch(url, { 
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Bot)' },
          signal: AbortSignal.timeout(10000)
        });
        
        if (!response.ok) continue;
        
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        
        if (!doc) continue;

        // Extract text content
        const textContent = doc.body?.textContent || '';
        const cleanText = textContent.replace(/\s+/g, ' ').trim();
        
        if (cleanText.length > 100) {
          contentBlocks.push({ url, text: cleanText });
        }

        // Find more links
        const links = doc.querySelectorAll('a[href]');
        for (const link of links) {
          const href = link.getAttribute('href');
          if (href?.startsWith('/')) {
            const fullUrl = baseUrl + href;
            if (!visited.has(fullUrl)) {
              urlsToVisit.push(fullUrl);
            }
          }
        }
      } catch (error) {
        console.error(`Failed to fetch ${url}:`, error);
        continue;
      }
    }

    // Split content into chunks
    const chunks: Array<{content: string, url: string}> = [];
    const chunkSize = 500;

    for (const block of contentBlocks) {
      const text = block.text;
      for (let i = 0; i < text.length; i += chunkSize) {
        const chunk = text.slice(i, i + chunkSize);
        if (chunk.trim().length > 50) {
          chunks.push({ content: chunk.trim(), url: block.url });
        }
      }
    }

    // Create embeddings and store in database
    let processedCount = 0;
    for (let i = 0; i < chunks.length; i += 5) { // Process in batches
      const batch = chunks.slice(i, i + 5);
      const texts = batch.map(chunk => chunk.content);

      try {
        const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: texts,
            model: 'text-embedding-ada-002',
          }),
        });

        const embeddingData = await embeddingResponse.json();
        
        // Store each chunk with its embedding
        for (let j = 0; j < batch.length; j++) {
          const chunk = batch[j];
          const embedding = embeddingData.data[j].embedding;

          await supabase.from('documents').upsert({
            content: chunk.content,
            url: chunk.url,
            embedding: embedding,
          });
        }
        
        processedCount += batch.length;
      } catch (error) {
        console.error('Error processing batch:', error);
      }
    }

    return new Response(JSON.stringify({ 
      message: `Successfully processed ${processedCount} chunks from ${contentBlocks.length} pages`,
      pagesFound: contentBlocks.length,
      chunksProcessed: processedCount
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in crawl-and-embed function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});