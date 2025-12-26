import "@prisma/client";

declare module "@prisma/client" {
  interface PrismaClientOptions {
    __internal?: {
      inlineSchema?: boolean;
    };
  }
}
