import { z } from "zod";

export function createSafeAction<TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<TOutput>
) {
  return async (data: TInput) => {
    const validationResult = schema.safeParse(data);
    
    if (!validationResult.success) {
      return { error: "Invalid data" };
    }
    
    try {
      const result = await handler(validationResult.data);
      return { data: result };
    } catch (error) {
      return { error: "Something went wrong" };
    }
  };
} 