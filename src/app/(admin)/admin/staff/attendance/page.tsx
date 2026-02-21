'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { useStaffAttendance, useMarkAttendance, useAdminStaff } from '@/lib/hooks/use-admin';
import { useTempleContextStore } from '@/lib/stores/temple-context-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

export default function StaffAttendancePage() {
  const templeId = useTempleContextStore((s) => s.selectedTempleId);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const { data: attendance } = useStaffAttendance(templeId ?? undefined, date);
  const { data: staff } = useAdminStaff(templeId ?? undefined);
  const markAttendance = useMarkAttendance();

  function handleMark(staffId: number, status: string) {
    markAttendance.mutate({ staffId, data: { date, status } });
  }

  return (
    <div>
      <PageHeader title="Staff Attendance" description="Track daily staff attendance">
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-auto"
        />
      </PageHeader>

      {!templeId ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Select a temple to track attendance</p>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Current Status</TableHead>
                <TableHead>Mark Attendance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff?.map((s) => {
                const record = attendance?.find((a) => a.staffId === s.id);
                return (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>{s.position || '-'}</TableCell>
                    <TableCell>
                      {record ? <StatusBadge status={record.status} /> : <span className="text-muted-foreground">Not marked</span>}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={record?.status || ''}
                        onValueChange={(value) => handleMark(s.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Mark" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PRESENT">Present</SelectItem>
                          <SelectItem value="ABSENT">Absent</SelectItem>
                          <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
