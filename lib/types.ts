export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "counselor" | "admin";
  created_at: string;
}

export interface Counselor {
  id: string;
  user_id: string;
  title: string;
  bio: string;
  specialties: string[];
  image_url?: string;
  is_active: boolean;
}

export interface AvailabilitySlot {
  id: string;
  counselor_id: string;
  date: string;
  start_time: string;
  end_time: string;
  type: "offline" | "online";
  is_reserved: boolean;
}

export interface Reservation {
  id: string;
  user_id: string;
  counselor_id: string;
  slot_id: string;
  type: "offline" | "online";
  status: "pending" | "confirmed" | "cancelled" | "completed";
  payment_id?: string;
  payment_status: "unpaid" | "paid" | "refunded";
  amount: number;
  memo?: string;
  created_at: string;
  counselor?: Counselor;
  slot?: AvailabilitySlot;
}

export interface MindtalkPost {
  id: string;
  user_id: string;
  title: string;
  content: string;
  is_private: boolean;
  is_answered: boolean;
  created_at: string;
  user?: { name: string };
  comments?: MindtalkComment[];
}

export interface MindtalkComment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  author?: { name: string };
}

export interface BoardPost {
  id: string;
  author_id: string;
  category: "notice" | "review" | "column";
  title: string;
  content: string;
  view_count: number;
  created_at: string;
  author?: { name: string };
}

export interface PsychologicalTest {
  id: string;
  name: string;
  description: string;
  duration_min: number;
  price: number;
  is_active: boolean;
}

export interface NewsPost {
  id: string;
  author_id: string;
  category: "center" | "event";
  title: string;
  content: string;
  thumbnail?: string;
  starts_at?: string;
  ends_at?: string;
  created_at: string;
}

export interface CounselingService {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  details: string[];
}
