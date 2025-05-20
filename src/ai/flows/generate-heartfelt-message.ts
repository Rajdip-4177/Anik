'use server';

/**
 * @fileOverview Generates a personalized, heartfelt birthday message for Anik.
 *
 * - generateHeartfeltMessage - A function that generates the heartfelt message.
 * - GenerateHeartfeltMessageInput - The input type for the generateHeartfeltMessage function.
 * - GenerateHeartfeltMessageOutput - The return type for the generateHeartfeltMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHeartfeltMessageInputSchema = z.object({
  friendName: z.string().describe('The name of the friend receiving the message (Anik).'),
  senderName: z.string().describe('The name of the sender (Rajdip).'),
  yearsOfFriendship: z.number().describe('The number of years of friendship.'),
  sharedMemories: z.string().describe('A summary of shared memories and experiences.'),
});
export type GenerateHeartfeltMessageInput = z.infer<typeof GenerateHeartfeltMessageInputSchema>;

const GenerateHeartfeltMessageOutputSchema = z.object({
  message: z.string().describe('The generated heartfelt birthday message.'),
});
export type GenerateHeartfeltMessageOutput = z.infer<typeof GenerateHeartfeltMessageOutputSchema>;

export async function generateHeartfeltMessage(
  input: GenerateHeartfeltMessageInput
): Promise<GenerateHeartfeltMessageOutput> {
  return generateHeartfeltMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHeartfeltMessagePrompt',
  input: {schema: GenerateHeartfeltMessageInputSchema},
  output: {schema: GenerateHeartfeltMessageOutputSchema},
  prompt: `You are a heartfelt birthday message generator. Your task is to create a touching and personalized birthday message for {{friendName}} from {{senderName}}.

The message should reflect the deep bond and shared history between {{senderName}} and {{friendName}}.
They have been friends for {{yearsOfFriendship}} years and have shared the following memories: {{sharedMemories}}.

Focus on expressing genuine emotions, gratitude for the friendship, and hopes for the future.
The message should feel personal and unique, as if it were written by {{senderName}} himself.

Output a single paragraph that is no more than 150 words.
`,
});

const generateHeartfeltMessageFlow = ai.defineFlow(
  {
    name: 'generateHeartfeltMessageFlow',
    inputSchema: GenerateHeartfeltMessageInputSchema,
    outputSchema: GenerateHeartfeltMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
