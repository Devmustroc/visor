import {useOpenCategory} from "@/features/categories/hooks/useOpenCategory";
import {TriangleAlert} from "lucide-react";
import {cn} from "@/lib/utils";
import {useOpenTransaction} from "@/features/transactions/hooks/useOpenTransaction";

type Props = {
    id: string
    category: string | null
    categoryId: string | null
};

const CategoryColumn = ({ id, category, categoryId }: Props) => {
    const { onOpen: onOpenCategory } = useOpenCategory();
    const { onOpen: onOpenTransaction } = useOpenTransaction();

    const onClick = () => {
        if (!categoryId) {
            onOpenTransaction(id);
        } else {
            onOpenCategory(categoryId);
        }
    }
    return (
        <div
            onClick={onClick}
            className={cn("flex items-center cursor-pointer hover:underline",
                    !category && "text-rose-400"
                )}
        >
            { !category  && <TriangleAlert className="mr-1 h-5 w-5 text-rose-500" />}
            { category  || 'Uncategorized'}
        </div>
    );
};

export default CategoryColumn;


