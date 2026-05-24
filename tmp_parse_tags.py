from pathlib import Path
import re
text = Path('src/app/admin/dashboard/page.tsx').read_text(encoding='utf-8')
start = text.index('return (')
lines = text[start:].splitlines()
stack = []
self_closing = re.compile(r'<([A-Za-z][A-Za-z0-9\-]*)\b[^>]*?/\s*>')
opening = re.compile(r'<([A-Za-z][A-Za-z0-9\-]*)\b[^/>]*?>')
closing = re.compile(r'</([A-Za-z][A-Za-z0-9\-]*)>')
for idx, line in enumerate(lines, start=1):
    # remove strings in line to avoid matching tags inside JS strings
    no_strings = re.sub(r"'(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\"", '', line)
    for m in self_closing.finditer(no_strings):
        pass
    # ignore fragments for now
    offset = 0
    while True:
        m_open = opening.search(no_strings, offset)
        m_close = closing.search(no_strings, offset)
        if not m_open and not m_close:
            break
        if m_close and (not m_open or m_close.start() < m_open.start()):
            tag = m_close.group(1)
            if stack and stack[-1] == tag:
                stack.pop()
            else:
                print(f'LINE {idx}: closing </{tag}> but stack={stack}')
                stack.append('/'+tag)
            offset = m_close.end()
        elif m_open:
            tag = m_open.group(1)
            # skip self-closing
            if not no_strings[m_open.start():m_open.end()].endswith('/>'):
                stack.append(tag)
            offset = m_open.end()
    if idx in (1,50,100,150,200,250,300,350,400):
        print('LINE', idx, 'stack', stack)
print('FINAL STACK', stack)
Path('tmp_parse_tags_report.txt').write_text('\n'.join([f'LINE {i}' for i in range(1)]), encoding='utf-8')
