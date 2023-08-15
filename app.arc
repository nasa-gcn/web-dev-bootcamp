@app
remix-architect-app

@http
/*
  method any
  src build/server

@static
fingerprint external
folder build/static

@plugins
plugin-remix
  src plugin-remix.mjs

@aws
runtime nodejs18.x
region us-east-1
architecture arm64

@tables
notes
  userId *String
  noteId **String
  PointInTimeRecovery true