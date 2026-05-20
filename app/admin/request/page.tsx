import { type RequestMessage, getRequestMessages } from '@/lib/services/contact.service';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function RequestPage() {
  const messages: RequestMessage[] = await getRequestMessages();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Titre</TableHead>
          <TableHead>Content</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {messages.map((message) => (
          <TableRow key={message.messageId}>
            <TableCell className="">{message.messageEmail}</TableCell>
            <TableCell>{message.messageType}</TableCell>
            <TableCell>{message.messageTitle}</TableCell>
            <TableCell className="">{message.messageContent}</TableCell>
            <TableCell>{message.messageStatus}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
