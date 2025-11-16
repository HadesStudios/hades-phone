name 'hades'
description 'Hades Framework Phone'
author '[HadesStudios]'
version 'v1.0.0'
url 'https://HadesCFX.studio'
lua54 'yes'
fx_version "cerulean"
game "gta5"
client_script "@hades-base/components/cl_error.lua"
client_script "@hades-pwnzor/client/check.lua"

ui_page 'ui/dist/index.html'

files {
  'ui/dist/*.*',
}
  
client_scripts {
  'client/*.lua',
  'client/apps/**/*.lua',
}

server_scripts {
  'server/*.lua',
  'server/apps/**/*.lua',
}