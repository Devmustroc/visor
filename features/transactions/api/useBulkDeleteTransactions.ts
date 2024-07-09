import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]['$post']>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete"]['$post']>['json'];

export const useBulkDeleteTransactions = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.transactions['bulk-delete']["$post"]({json})
            return response.json();
        },
        onSuccess: () => {
            toast.success("Transactions deleted successfully")
            queryClient.invalidateQueries({ queryKey: ['transactions']});
            // Also invalidate summary query

        },
        onError: () => {
            toast.error("Failed to delete transactions")
        }
    });

    return mutation;
}