import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { BuyerPersonaSchema } from '@/app/api/buyer-persona/schema';
import { turso } from "@/lib/turso"
import { BuyerPersona } from '@/types/projects';

export const generateBuyerPersonaForProject = async (prompt: string) => {

  if (!prompt) {
    throw {
      message: 'El prompt del proyecto es obligatorio',
      status: 400,
    }
  }

  const result = await generateObject({
    model: openai('o4-mini'),
    schema: BuyerPersonaSchema,
    messages: [
      {
        role: 'system',
        content: 'Eres un asistente experto en marketing especializado en la generación de buyer personas y público objetivo para páginas web.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
  });

  const buyerPersona = result.toJsonResponse();
  return await buyerPersona.json();
}

export const insertBuyerPersona = async (projectId: string, buyerPersona: BuyerPersona) => {

  if (!buyerPersona || !projectId) {
    throw {
      message: 'El buyer persona y el ID del proyecto son obligatorios',
      status: 400,
    }
  }

  await turso.execute(`
    INSERT INTO buyer_personas (project_id, name, demographics, family, work, behaviors, problems, solutions, barriers)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    projectId,
    JSON.stringify(buyerPersona.name),
    JSON.stringify(buyerPersona.demographics),
    JSON.stringify(buyerPersona.family),
    JSON.stringify(buyerPersona.work),
    JSON.stringify(buyerPersona.behaviors),
    JSON.stringify(buyerPersona.problems),
    JSON.stringify(buyerPersona.solutions),
    JSON.stringify(buyerPersona.barriers),
  ]);
  return { success: true };

}