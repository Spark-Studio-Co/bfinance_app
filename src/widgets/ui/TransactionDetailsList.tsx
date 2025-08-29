import React from 'react';
import { View } from 'react-native';
import { DetailRow } from '~/features/Transactions/ui/DetailRow';
import { Transaction } from '~/entities/transaction/model/types';

interface TransactionDetailsListProps {
  transaction: Transaction;
}

export const TransactionDetailsList: React.FC<TransactionDetailsListProps> = ({ transaction }) => {
  if (!transaction) return null;

  const formatAmount = (amount?: number) =>
    amount === undefined || amount === null ? '—' : `${amount.toFixed(2)} USD`;

  const formatFee = (fee?: number) =>
    fee === undefined || fee === null ? '—' : `${fee.toFixed(2)} USD`;

  const formatDate = (ts?: string | number | Date) => {
    if (!ts) return '—';
    const d = new Date(ts);
    // если дата невалидная
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleString();
  };

  const short = (v?: string, left = 6, right = 4) => {
    if (!v) return '—';
    const s = String(v);
    if (s.length <= left + right + 1) return s;
    return `${s.slice(0, left)}…${s.slice(-right)}`;
  };

  const statusLabel = (status?: string) => {
    if (!status) return '—';
    switch (status.toLowerCase()) {
      case 'success':
      case 'succeeded':
      case 'completed':
        return 'Completed';
      case 'pending':
      case 'processing':
        return 'Pending';
      case 'failed':
      case 'error':
        return 'Failed';
      default:
        return status;
    }
  };

  const statusVariant =
    String(transaction?.status ?? '').toLowerCase() === 'failed' ? 'error' : 'normal';

  return (
    <View className="gap-2">
      <DetailRow label="Amount" value={formatAmount((transaction as any)?.amount)} />
      {'fee' in (transaction as any) && (
        <DetailRow label="Fee" value={formatFee((transaction as any)?.fee)} />
      )}
      {'status' in (transaction as any) && (
        <DetailRow
          label="Status"
          value={statusLabel((transaction as any)?.status)}
          variant={statusVariant}
        />
      )}
      {'from' in (transaction as any) && (
        <DetailRow label="From" value={short((transaction as any)?.from)} />
      )}
      {'to' in (transaction as any) && (
        <DetailRow label="To" value={short((transaction as any)?.to)} />
      )}
      {('hash' in (transaction as any) || 'txHash' in (transaction as any)) && (
        <DetailRow
          label="Tx Hash"
          value={short(((transaction as any)?.hash ?? (transaction as any)?.txHash) as string)}
        />
      )}
      {'method' in (transaction as any) && (
        <DetailRow label="Method" value={String((transaction as any)?.method ?? '—')} />
      )}
      {('createdAt' in (transaction as any) || 'date' in (transaction as any)) && (
        <DetailRow
          label="Date"
          value={formatDate(((transaction as any)?.createdAt ?? (transaction as any)?.date) as any)}
        />
      )}
    </View>
  );
};
