import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts[':id']['$patch']>;
type RequestType = InferRequestType<typeof client.api.accounts[':id']['$patch']>["json"];

export const useEditAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.accounts[':id']['$patch']({
                param: { id },
                json
            });
            return response.json();
        },
        onSuccess: () => {
            toast.success("Account updated successfully")
            queryClient.invalidateQueries({ queryKey: ['accounts', { id }] });
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            // invalidater Summary query and transaction query

        },
        onError: () => {
            toast.error("Failed to update account")
        }
    });

    return mutation;
}