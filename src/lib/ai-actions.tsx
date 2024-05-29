"use server"

import {ReactNode} from "react";
import {createAI, getMutableAIState, streamUI} from "ai/rsc";
import {z} from "zod";
import {openai} from "@ai-sdk/openai";
import {getChirii} from "@/lib/actions";
import {Chirie} from "@/app/_components/chirie";

export interface ServerMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface ClientMessage {
    role: 'user' | 'assistant';
    display: ReactNode;
}


export async function continueConversation(
    input: string,
): Promise<ClientMessage> {
    const history = getMutableAIState();

    const result = await streamUI({
        model: openai('gpt-3.5-turbo'),
        system: "Esti un asistent de vanzari pentru chirii, scopul tau este sa ajuti clientii sa gaseasca chiria dorita. Ai intrebat initial: 'Salut, cum te pot ajuta?'",
        messages: [...history.get(), { role: 'user', content: input }],
        text: ({ content, done }) => {
            if (done) {
                history.done((messages: ServerMessage[]) => [
                    ...messages,
                    { role: 'assistant', content },
                ]);
                console.log(`AI: ${content}`);
            }

            return <div>{content}</div>;
        },
        tools: {
            returneazaChirii: {
                description: "Returneaza chirii disponibile, in functie de criteriile clientului.",
                parameters: z.object({
                    numarChirii: z.number().int().positive().describe("Numarul de chirii pe care sa le returneze.").default(10),
                    detaliiChirii: z.string().describe("Detaliile chirii dorite de client. Te rog sa le descrii cat mai detaliat conform criteriilor mentionate de utilizator.")
                        .default("")
                }),
                generate: async function* ({ numarChirii, detaliiChirii }) {

                    yield <div>Returnez chirii...</div>;

                    const chirii = await getChirii(detaliiChirii, numarChirii);
                    if (chirii.length === 0) {

                        history.done((messages: ServerMessage[]) => [
                            ...messages,
                            { role: 'assistant', content: "Nu am gasit nicio chirie disponibila." },
                        ]);

                        return <div>Nu am gasit nicio chirie disponibila.</div>;
                    }

                    history.done((messages: ServerMessage[]) => [
                        ...messages,
                        { role: 'assistant', content: `Am gasit ${chirii.length} chirii disponibile.
                        Acestea sunt: ${JSON.stringify(chirii, null, 2)}` },
                    ]);

                    return <div className="p-4">
                        <p className="text-lg font-semibold mb-2">Chirii disponibile conform criteriilor tale:</p>
                        <div className="flex flex-row flex-wrap justify-left">
                        {
                            chirii.map((chirie) => {
                                return <Chirie chirie={chirie} key={chirie.id} />;
                            })
                        }
                        </div>
                    </div>
                }
            }
        }
    });

    return {
        role: 'assistant',
        display: result.value,
    };
}


export const AI = createAI<ServerMessage[], ClientMessage[]>({
    actions: {
        continueConversation,
    },
    initialAIState: [],
    initialUIState: [],
});