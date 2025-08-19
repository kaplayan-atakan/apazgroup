import { redirect } from 'next/navigation';

// Kök URL doğrudan /tr'ye yönlendiriliyor (middleware'e ek olarak 404 flash engeli).
export default function RootIndex() {
  redirect('/tr');
}
