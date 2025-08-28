<?php

$setupFile = base_path('setup.json');

return file_exists($setupFile)
    ? json_decode(file_get_contents($setupFile), true)
    : [];
