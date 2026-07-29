# `constants/` — values that never change and must not be duplicated

`routes.ts` is the important one: every internal link resolves through the typed
route map, so a URL change is a single edit and the redirect map stays honest.
