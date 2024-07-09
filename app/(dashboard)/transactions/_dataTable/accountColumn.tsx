import {useOpenAccount} from "@/features/accounts/hooks/useOpenAccount";

type Props = {
    id: string
    account: string
    accountId: string
};

const AccountColumn = ({ id, account, accountId }: Props) => {
    const { onOpen: onOpenAccount } = useOpenAccount();

    const onClick = () => {
        onOpenAccount(accountId);
    }
    return (
        <div
            onClick={onClick}
            className="flex items-center cursor-pointer hover:underline"
        >
            { account }
        </div>
    );
};

export default AccountColumn;