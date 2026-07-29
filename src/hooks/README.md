# `hooks/` — client-only React hooks

Everything here implies `'use client'` at the point of use. Keeping hooks in one
place makes the client-side blast radius visible: if this folder is growing
quickly, the Server-Components-by-default policy (§5) is slipping.
