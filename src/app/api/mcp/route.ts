export async function GET() {
  const mcpConfig = {
    name: "boyce-pro",
    description: "Boyce Poleon Jr.'s personal website and portfolio",
    version: "1.0.0",
    capabilities: {
      resources: [
        {
          uri: "content://about",
          name: "About Boyce",
          description: "Personal background and professional experience",
          mimeType: "text/plain"
        },
        {
          uri: "content://stack", 
          name: "Technology Stack",
          description: "Tools and technologies used for development",
          mimeType: "application/json"
        },
        {
          uri: "content://blog",
          name: "Blog Posts", 
          description: "Articles about AI automation and development",
          mimeType: "application/json"
        },
        {
          uri: "content://guides",
          name: "Development Guides",
          description: "Technical tutorials and documentation", 
          mimeType: "application/json"
        }
      ],
      tools: [
        {
          name: "contact",
          description: "Send a message to Boyce Poleon Jr.",
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string", description: "Your name" },
              email: { type: "string", description: "Your email address" },
              message: { type: "string", description: "Your message" }
            },
            required: ["name", "email", "message"]
          }
        }
      ]
    },
    meta: {
      author: "Boyce Poleon Jr.",
      contact: "boyce@agentbolt.ai",
      website: "https://boyce.pro",
      updated: new Date().toISOString()
    }
  };

  return Response.json(mcpConfig);
}

export async function POST(request: Request) {
  try {
    const { method, params } = await request.json();
    
    switch (method) {
      case 'resources/list':
        return Response.json({
          resources: [
            {
              uri: "content://about",
              name: "About Boyce", 
              mimeType: "text/plain"
            },
            {
              uri: "content://stack",
              name: "Technology Stack",
              mimeType: "application/json"  
            }
          ]
        });
        
      case 'resources/read':
        const uri = params.uri;
        switch (uri) {
          case 'content://about':
            return Response.json({
              contents: [{
                uri,
                mimeType: "text/plain",
                text: "Boyce Poleon Jr. is a full-stack TypeScript developer, founder of Luminon Gaming, and builder of AI-powered business automation systems."
              }]
            });
            
          default:
            return Response.json({ error: "Resource not found" }, { status: 404 });
        }
        
      case 'tools/call':
        if (params.name === 'contact') {
          // In a real implementation, this would send an email or save to database
          return Response.json({
            content: [{
              type: "text",
              text: `Message received from ${params.arguments.name} (${params.arguments.email}): ${params.arguments.message}`
            }]
          });
        }
        return Response.json({ error: "Tool not found" }, { status: 404 });
        
      default:
        return Response.json({ error: "Method not supported" }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}