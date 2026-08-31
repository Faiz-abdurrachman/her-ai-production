# Manual Production QA Scripts

These scripts are historical, manually-invoked QA utilities. They are not part of an
automated test suite and several of them authenticate against production or trigger
save actions.

- Never run them without explicit approval for the exact production test.
- Use only the dedicated QA credentials supplied through environment variables.
- Never use a real participant account.
- Review the script first and define mutation, read-back, restore, and residue checks.
- Run shared-credential tests serially.

Moving these files here changes only their repository location. Their behavior has
not been modified.
