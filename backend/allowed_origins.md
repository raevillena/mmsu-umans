ALLOWED_ORIGINS_PROD=https://umans.nbericmmsu.com,https://nbericmmsu.com,https://vrms.nbericmmsu.com,http://localhost:5173,http://localhost:3000

redis-cli -u redis://10.10.30.102:6379 \
  SET allowed_origins '["https://mmsu-grader.nbericmmsu.com","https://task.nbericmmsu.com","https://umans.nbericmmsu.com","https://vrms.nbericmmsu.com","http://localhost:3000","http://localhost:5173"]'