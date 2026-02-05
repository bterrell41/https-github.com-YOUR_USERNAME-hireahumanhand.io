#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Mock Data for MVP
const MOCK_HUMANS = [
    { id: "h1", name: "Alice", skills: ["logistics", "photography"], rate: 50, verified: true },
    { id: "h2", name: "Bob", skills: ["translation", "writing"], rate: 30, verified: false }
];

const server = new Server(
    {
        name: "human-hand-clearance",
        version: "0.1.0",
    },
    {
        capabilities: {
            resources: {},
            tools: {},
        },
    }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "search_humans",
                description: "Search for verified humans by skill.",
                inputSchema: {
                    type: "object",
                    properties: {
                        skill: { type: "string" },
                        verified_only: { type: "boolean" }
                    },
                    required: ["skill"]
                },
            },
            {
                name: "get_human",
                description: "Get details about a specific human.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string" }
                    },
                    required: ["id"]
                }
            }
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === "search_humans") {
        const skill = String(args?.skill).toLowerCase();
        const results = MOCK_HUMANS.filter(h => h.skills.includes(skill));
        return {
            content: [{ type: "text", text: JSON.stringify(results, null, 2) }]
        };
    }

    if (name === "get_human") {
        const id = String(args?.id);
        const human = MOCK_HUMANS.find(h => h.id === id);
        if (!human) throw new Error("Human not found");
        return {
            content: [{ type: "text", text: JSON.stringify(human, null, 2) }]
        }
    }

    throw new Error("Tool not found");
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("HHC MCP Server running on stdio");
