@echo off
cd /d d:\rustinnovations.com
python - <<EOF
from pathlib import Path
lines = Path('src/app/admin/dashboard/page.tsx').read_text('utf-8').splitlines()
for i in range(1038, 1066):
    print(f'{i}: {lines[i-1]}')
EOF
