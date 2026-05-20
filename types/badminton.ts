export interface Member {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShuttlecockPlayer {
  id: string;
  shuttlecockId: string;
  memberId: string;
  memberName: string;
  isPaid: boolean;
  paidAt?: string;
}

export type ShuttlecockStatus = 'Pending' | 'Completed';

export interface Shuttlecock {
  id: string;
  tubeId: string;
  shuttlecockNo: number;
  feePerPlayer: number;
  status: ShuttlecockStatus;
  players: ShuttlecockPlayer[];
  createdAt: string;
  updatedAt: string;
}

export interface ShuttlecockTube {
  id: string;
  tubeNo: number;
  createdAt: string;
  updatedAt: string;
  shuttlecocks: Shuttlecock[];
}
