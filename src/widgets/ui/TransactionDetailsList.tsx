import React from 'react';
import { View, Text } from 'react-native';
import { DetailRow } from '~/features/Transactions/ui/DetailRow';
import { Transaction } from '~/entities/transaction/model/types';

interface TransactionDetailsListProps {
  transaction: Transaction;
}

export const TransactionDetailsList: React.FC<TransactionDetailsListProps> = ({ transaction }) => {
  if (!transaction) return null;

  const formatAmount = (amount?: number) =>
    amount === undefined || amount === null ? '—' : `${amount} USD`;

  const formatFee = (fee?: number) => (fee === undefined || fee === null ? '—' : `${fee}$`);

  // Показываем decline reason для failed транзакций
  const showDeclineReason = transaction.status === 'failed' && transaction.declineReason;

  return (
    <View className="gap-3">
      {/* Показываем decline reason только для failed транзакций */}
      {showDeclineReason && (
        <DetailRow label="Insufficient funds" value="Decline reason" variant="error" />
      )}

      {/* Объединенная карточка для Billed amount и Fee */}
      <View className="rounded-[16px] bg-[#0F0F0F] px-6 py-6">
        {/* Billed amount */}
        <View className="flex-row items-center justify-between pb-3">
          <Text className="pb-0 text-[16px] font-medium text-white">Billed amount</Text>
          <Text className="text-[14px] text-[#878787]">
            {formatAmount(transaction.billedAmount)}
          </Text>
        </View>

        {/* Separator */}
        <View className="h-0.5 bg-[#1E1E1E]" />

        {/* Fee */}
        <View className="flex-row items-center justify-between pt-4">
          <Text className="text-[16px] font-medium text-white">Fee</Text>
          <Text className="text-[14px] text-[#878787]">{formatFee(transaction.fee)}</Text>
        </View>
      </View>

      {/* Transaction ID - отдельная карточка */}
      <DetailRow label="Transaction ID" value={transaction.transactionId} />
    </View>
  );
};
