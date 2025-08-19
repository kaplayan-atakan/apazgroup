/* eslint-disable @typescript-eslint/no-explicit-any */
import { BasvuruFormSchema } from '../src/lib/formSchemas';

function expectEqual(a: any, b: any, message: string) {
  if (JSON.stringify(a) !== JSON.stringify(b)) {
    // eslint-disable-next-line no-console
    console.error('Assertion failed:', message, '\nExpected:', b, '\nReceived:', a);
    process.exit(1);
  }
}

// Happy path
{
  const input = {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    phone: '+90 532 000 00 00',
    position: 'Engineer',
    message: 'Merhaba, başvurmak istiyorum.',
    consent: true
  };
  const parsed = BasvuruFormSchema.safeParse(input);
  expectEqual(parsed.success, true, 'Happy path should succeed');
}

// Missing required
{
  const input = {
    name: '',
    email: 'not-an-email',
    phone: '',
    message: 'short',
    consent: false
  } as any;
  const parsed = BasvuruFormSchema.safeParse(input);
  expectEqual(parsed.success, false, 'Invalid input should fail');
}

// Edge: long message
{
  const input = {
    name: 'AB',
    email: 'a@b.co',
    phone: '1234567',
    message: 'x'.repeat(2000),
    consent: true
  };
  const parsed = BasvuruFormSchema.safeParse(input);
  expectEqual(parsed.success, true, 'Max length message should pass');
}

// eslint-disable-next-line no-console
console.log('formSchema.test.ts: All assertions passed.');
