from typing import Any
import httpx
from mcp.server.fastmcp import FastMCP

# Initialize FastMCP server
mcp = FastMCP("warehouse")

items = [
    {
        "name": "Bulk Item 1",
        "price": 100000
    },
    {
        "name": "Bulk Item 2",
        "price": 200000
    },
    {
        "name": "Bulk Item 3",
        "price": 300000
    }
]

@mcp.tool()
async def get_items() -> str:
    """Get items in the warehouse."""
    return str(items);

@mcp.tool()
async def buy_item(item: str) -> str:
    """Buy an item from the warehouse."""
    return f"Buying {item} from the warehouse."

def main():
    mcp.run(transport="sse")


if __name__ == "__main__":
    main()
