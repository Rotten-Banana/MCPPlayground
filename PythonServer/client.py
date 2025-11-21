import asyncio
from fastmcp import Client

from fastmcp.client.transports import SSETransport



async def get_tools_list():
    # Set the server URL to where your FastMCP server is running
    server_url = "http://localhost:8000/sse" 
    # transport = SSETransport(
    #     url="https://api.example.com/sse",
    #     headers={"Authorization": "Bearer token"}
    # )
    
    # The Client handles all session IDs, Accept headers, and transport logic internally
    async with Client(server_url) as client:
        tools_response = await client.list_tools()
        print("Successfully retrieved available tools:")
        for tool in tools_response:
            print(f" - {tool.name}: {tool.description}")

if __name__ == "__main__":
    # Ensure your Python server is running in a separate terminal
    asyncio.run(get_tools_list())