#!/usr/bin/env bash
# Takes the translations from Caslingo (https://caslingo.casdoor.com/projects/casbin-website) before the build:
# uploads the site texts that `docusaurus write-translations` generates, asks Caslingo to pull this commit and waits
# for it, then downloads the translation files of every language into i18n/.
set -euo pipefail

url="${CASLINGO_URL:-https://caslingo.casdoor.com}"
project=casbin-website
auth="Authorization: Bearer ${CASLINGO_TOKEN:?set CASLINGO_TOKEN to the access token of the Caslingo project}"
commit="${GITHUB_SHA:-$(git rev-parse HEAD)}"

yarn docusaurus write-translations --locale en
for f in $(find i18n/en -name '*.json' | sort); do
  curl -fsS -H "$auth" -H "Content-Type: application/octet-stream" --data-binary @"$f" \
    "$url/api/upload-source?project=$project&path=$f&sync=false" > /dev/null
done

# if Caslingo is busy pulling an earlier commit, it pulls again when that is done
curl -fsS -X POST -H "$auth" "$url/api/start-job?project=$project&kind=sync" > /dev/null
synced=""
for _ in $(seq 1 60); do
  synced=$(curl -fsS -H "$auth" "$url/api/get-project?project=$project" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.parse(s).data.lastSyncCommit||""))')
  [ "$synced" = "$commit" ] && break
  sleep 10
done
if [ "$synced" != "$commit" ]; then
  echo "Caslingo has not pulled $commit after 10 minutes (it has $synced); using its translations as they are"
fi

curl -fsS -H "$auth" "$url/api/download-translations?project=$project" -o translations.zip
unzip -o -q translations.zip
rm translations.zip

# translated pages import what sits next to them (a styles.module.css), as the English pages do
for locale in $(ls i18n); do
  [ "$locale" = en ] && continue
  for pair in docs:docusaurus-plugin-content-docs/current blog:docusaurus-plugin-content-blog; do
    src=${pair%%:*}
    dst=i18n/$locale/${pair#*:}
    find "$src" -type f ! -name '*.md' ! -name '*.mdx' | while read -r f; do
      mkdir -p "$dst/$(dirname "${f#$src/}")"
      cp "$f" "$dst/${f#$src/}"
    done
  done
done
echo "translations of $(ls -d i18n/*/ | grep -v '/en/$' | wc -l) languages from Caslingo"