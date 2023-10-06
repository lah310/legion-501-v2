import { createClient } from '@supabase/supabase-js'

const supa = createClient(
	'https://mhzivnzorzxcqxahxqnh.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oeml2bnpvcnp4Y3F4YWh4cW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzOTczMjEsImV4cCI6MjAxMTk3MzMyMX0.s2Q9cFtBwO24vQeQPY8qZJ4AqOutFAgCwvg-KI7Aipo'
)

export default supa
