# `actions/` — Server Actions

`'use server'` mutations: enquiry forms, newsletter signup, feedback.

Kept separate from reads so the RPC surface is auditable in one place, which
matters for security review. Every action validates its input with Zod before
touching a service.
