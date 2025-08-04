# MCP Project Overview

This project explores how the MCP (Model Context Protocol) works by providing both Node.js and Python server implementations, each exposing their own MCP endpoints for client connections.

## Server Endpoints

- **Node.js Server:**  
  Exposes MCP endpoint at [`http://localhost:3000/mcp`](http://localhost:3000/mcp)

- **Python Server:**  
  Exposes MCP endpoint at [`http://localhost:8000/sse`](http://localhost:8000/sse)

## Usage

1. **Start the Node.js server**  
   This will listen for MCP client connections at `/mcp` on port 3000.

2. **Start the Python server**  
   This will listen for MCP client connections at `/sse` on port 8000.

3. **Connect MCP clients**  
   Point your MCP clients to the appropriate endpoint depending on which server you want to interact with.

## Purpose

This setup allows you to compare and explore how MCP works across different server implementations and endpoints.


## Connecting via Claude Desktop

You can connect to these servers using Claude Desktop by configuring its settings file:

1. **Open the configuration file:**  
   Navigate to  
   `C:\Users\<USER>\AppData\Roaming\Claude\claude_desktop_config.json`  
   (Replace `<USER>` with your Windows username.)

2. **Modify the JSON as follows:**  
   Update or add the `mcpServers` section so it looks like this:

   ```json
   {
     "mcpServers": {
       "store": {
         "command": "npx",
         "args": [
           "mcp-remote",
           "http://localhost:3000/mcp"
         ]
       },
       "warehouse": {
         "command": "npx",
         "args": [
           "mcp-remote",
           "http://localhost:8000/sse"
         ]
       }
     }
   }
   ```

3. **Save the file** and restart Claude Desktop if it is running.

Now, you should be able to connect to both the Node.js and Python MCP servers directly from Claude Desktop using the configured endpoints.



