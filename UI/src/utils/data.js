export const BAD_CODE = `import os, sys, json
from datetime  import datetime,timedelta
import requests,urllib

def getUserData(id,db,cache,logger,   config):
    data=db.query("SELECT * FROM users WHERE id="+str(id))
    if data==None:
        return None
    if data!=None:
        logger.log("got user: "+str(data))
        cached=cache.get("user_"+str(id))
        if cached!=None:
            return cached

    password=data['password']
    token=data['token']
    secret_key="hardcoded_secret_abc123"

    result={}
    result['id']=data['id']
    result['name']=data['name']
    result['password']=password
    result['token']=token

    unused_var = "this does nothing"
    x=1
    y=2

    try:
        resp=requests.get("http://api.example.com/user/"+str(id),verify=False)
        result['profile']=json.loads(resp.text)
    except:
        pass

    return result

def ProcessOrders( orders,db ):
    for i in range(0,len(orders)):
        o=orders[i]
        if o['status']=='pending' or o['status']=='PENDING':
            db.execute("UPDATE orders SET status='processing' WHERE id="+str(o['id']))
            print("updated: "+str(o['id']))
`

export const GOOD_CODE = `import json
import logging
import os
from typing import Optional

import requests

logger = logging.getLogger(__name__)

SECRET_KEY = os.environ.get("SECRET_KEY")
API_BASE_URL = os.environ.get("API_BASE_URL", "https://api.example.com")

PENDING_STATUSES = {"pending", "PENDING", "Pending"}


def get_user_data(
    user_id: int,
    db,
    cache,
    config: dict,
) -> Optional[dict]:
    """Fetch user data with caching support."""
    cache_key = f"user_{user_id}"
    if cached := cache.get(cache_key):
        return cached

    data = db.query(
        "SELECT id, name FROM users WHERE id = %s",
        (user_id,),
    )
    if data is None:
        return None

    logger.info("Fetched user %d from database", user_id)

    try:
        resp = requests.get(
            f"{API_BASE_URL}/user/{user_id}",
            timeout=5,
            verify=True,
        )
        resp.raise_for_status()
        profile = resp.json()
    except requests.RequestException:
        logger.warning("Failed to fetch profile for user %d", user_id)
        profile = {}

    return {
        "id": data["id"],
        "name": data["name"],
        "profile": profile,
    }


def process_orders(orders: list[dict], db) -> None:
    """Process all pending orders."""
    pending = [o for o in orders if o["status"] in PENDING_STATUSES]
    for order in pending:
        db.execute(
            "UPDATE orders SET status = %s WHERE id = %s",
            ("processing", order["id"]),
        )
        logger.info("Processed order %d", order["id"])
`

export const LINT_ERRORS = [
  { line: 1,  type: 'error',   msg: 'Multiple imports on one line (E401)',         fix: 'Split into separate import statements' },
  { line: 1,  type: 'warning', msg: 'Unused import: sys (F401)',                   fix: 'Remove unused import' },
  { line: 1,  type: 'warning', msg: 'Unused import: urllib (F401)',                fix: 'Remove unused import' },
  { line: 5,  type: 'error',   msg: 'Function has 5 arguments max 4 (PLR0913)',   fix: 'Reduce parameters or use a config object' },
  { line: 6,  type: 'error',   msg: 'SQL injection vulnerability (S608)',           fix: 'Use parameterized queries' },
  { line: 14, type: 'error',   msg: 'Hardcoded secret detected (S105)',             fix: 'Use environment variable' },
  { line: 23, type: 'warning', msg: 'Unused variable: unused_var (F841)',          fix: 'Remove or use the variable' },
  { line: 24, type: 'warning', msg: 'Ambiguous variable name: x (E741)',           fix: 'Use descriptive name' },
  { line: 29, type: 'error',   msg: 'Insecure request: verify=False (S501)',       fix: 'Enable SSL verification' },
  { line: 31, type: 'error',   msg: 'Bare except clause (E722)',                   fix: 'Catch specific exceptions' },
  { line: 36, type: 'warning', msg: 'Use enumerate() instead of range(len()) (B007)', fix: 'for i, o in enumerate(orders)' },
  { line: 38, type: 'warning', msg: 'Repeated comparisons use a set (PLR1714)',   fix: 'Use: status in PENDING_STATUSES' },
  { line: 39, type: 'error',   msg: 'SQL injection vulnerability (S608)',           fix: 'Use parameterized queries' },
]

export const LANGUAGES = [
  { name: 'Python',     color: '#3776AB', linters: ['Ruff', 'Black', 'mypy', 'isort'],         rules: 847 },
  { name: 'TypeScript', color: '#3178C6', linters: ['ESLint', 'Prettier', 'tsc'],              rules: 632 },
  { name: 'JavaScript', color: '#F7DF1E', linters: ['ESLint', 'Prettier', 'JSHint'],           rules: 584 },
  { name: 'Rust',       color: '#CE422B', linters: ['Clippy', 'rustfmt', 'cargo audit'],       rules: 421 },
  { name: 'Go',         color: '#00ADD8', linters: ['golangci-lint', 'gofmt', 'staticcheck'],  rules: 318 },
  { name: 'Java',       color: '#ED8B00', linters: ['Checkstyle', 'PMD', 'SpotBugs'],          rules: 743 },
  { name: 'CSS',        color: '#264DE4', linters: ['Stylelint', 'CSSLint'],                   rules: 276 },
  { name: 'Ruby',       color: '#CC342D', linters: ['RuboCop', 'Reek', 'Brakeman'],            rules: 389 },
  { name: 'Kotlin',     color: '#7F52FF', linters: ['Detekt', 'ktlint'],                       rules: 312 },
  { name: 'Swift',      color: '#FA7343', linters: ['SwiftLint', 'swift-format'],              rules: 298 },
  { name: 'C++',        color: '#004482', linters: ['Clang-Tidy', 'cppcheck', 'cpplint'],     rules: 512 },
  { name: 'PHP',        color: '#777BB4', linters: ['PHPCS', 'PHPStan', 'Psalm'],              rules: 467 },
]

export const STATS = [
  { value: 68,   decimals: 0, suffix: '%',  label: 'Fewer PR review comments'  },
  { value: 4.2,  decimals: 1, suffix: 'h',  label: 'Saved per dev per week'    },
  { value: 99.7, decimals: 1, suffix: '%',  label: 'Auto-fix success rate'     },
  { value: 327,  decimals: 0, suffix: '+',  label: 'Lint rules enforced'       },
  { value: 24,   decimals: 0, suffix: '',   label: 'Languages supported'       },
  { value: 50,   decimals: 0, suffix: 'ms', label: 'Average scan time'        },
]

export const PIPELINE_STEPS = [
  { id: 'ingest', label: 'Code Ingested',    desc: 'Files parsed and tokenized',        color: '#7C5CFC' },
  { id: 'ai',     label: 'AI Analysis',      desc: 'LLM detects semantic issues',       color: '#00D2FF' },
  { id: 'rules',  label: 'Rule Engine',      desc: '327 rules applied in parallel',    color: '#FFA502' },
  { id: 'fix',    label: 'Auto-Fix',         desc: 'Safe fixes applied automatically',  color: '#2ED573' },
  { id: 'report', label: 'Report Generated', desc: 'Full diff with explanations',       color: '#FF6B9D' },
]

export const SAMPLE_INPUT = `function fetchUser(id) {
  var data = db.query("SELECT * FROM users WHERE id=" + id)
  if(data == null){
      return null
  }
  var unused = "nothing"
  try {
    var resp = fetch("http://api.com/user/"+id)
    data.profile = JSON.parse(resp)
  } catch(e) {}
  return data
}`

export const SAMPLE_OUTPUT = `async function fetchUser(id) {
  if (!id || typeof id !== 'number') {
    throw new TypeError('id must be a number')
  }
  const data = await db.query(
    'SELECT id, name FROM users WHERE id = ?',
    [id]
  )
  if (!data) return null

  try {
    const resp = await fetch(\`\${API_BASE_URL}/user/\${id}\`, {
      headers: { Authorization: \`Bearer \${process.env.API_TOKEN}\` },
    })
    if (!resp.ok) throw new Error(\`HTTP \${resp.status}\`)
    data.profile = await resp.json()
  } catch (err) {
    logger.warn('Profile fetch failed', { id, err })
  }
  return data
}`
