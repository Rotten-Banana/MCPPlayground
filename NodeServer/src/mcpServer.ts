import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Mock data set
const items = [
    {
        "name": "Item 1",
        "price": 100
    },
    {
        "name": "Item 2",
        "price": 200
    },
    {
        "name": "Item 3",
        "price": 300
    }
]

const server = new McpServer({
    name: "store",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});

// Register weather tools
server.tool(
    "Get-Items",
    "Get a list of items available in the store",
    {},
    async () => {
        const itemData = items;

        const formattedItems = itemData.map((item) => `${item.name} - $${item.price}`);
        const itemsText = `Items:\n\n${formattedItems.join("\n")}`;

        return {
            content: [
                {
                    type: "text",
                    text: itemsText,
                },
            ],
        };
    },
);

server.tool(
    "Buy-Item",
    "Buy an item from the store",
    {
        i: z.string().describe("The item to buy"),
    },
    async ({ i }) => {
        // Get grid point data
        const itemData = items.find((item) => item.name === i);

        if (!itemData) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Failed to retrieve item data for item: ${i}.`,
                    },
                ],
            };
        }

        const itemPrice = itemData.price;
        if (!itemPrice) {
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to get item price",
                    },
                ],
            };
        } else {
            return {
                content: [
                    {
                        type: "text",
                        text: `Item price: $${itemPrice} has been bought`,
                    },
                ],
            };
        }
    },
);

// Register prompt
server.prompt(
    "teacher-prompt",
    "Teacher",
    {},
    async ({}) => {
        return {
            messages: [
                {
                    content: {
                        type: "text",
                        text: `Think of yourself as a teacher and help me with whatever my doubts are and answer them in a way that is easy to understand and helpful.`,
                    },
                    role: "user",
                }
            ],
        };
    },
);

// Register resource
server.resource(
    "cars",
    "mcp://store/cars",
    async () => {
        const cars = [
            { make: "A", model: "A4", year: 2022 },
            { make: "B", model: "X5", year: 2021 },
            { make: "M", model: "C-C", year: 2020 },
            { make: "V", model: "G", year: 2023 },
        ];
        return {
            contents: [
                {
                    uri: "mcp://store/cars",
                    text: JSON.stringify(cars, null, 2),
                    mimeType: "application/json",
                },
            ],
        };
    },
);

export default server;