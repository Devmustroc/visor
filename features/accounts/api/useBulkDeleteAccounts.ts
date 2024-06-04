import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]['$post']>;
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]['$post']>['json'];

export const useBulkDeleteAccount = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.accounts['bulk-delete']["$post"]({json})
            return response.json();
        },
        onSuccess: () => {
            toast.success("Account deleted successfully")
            queryClient.invalidateQueries({ queryKey: ['accounts']});
            // Also invalidate summary query

        },
        onError: () => {
            toast.error("Failed to delete account")
        }
    });

    return mutation;
}