#!/bin/bash
# 数据库自动备份脚本

BACKUP_DIR="backup"
DB_NAME="database"
USER="psql"
HOST="localhost"
DATE=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="$BACKUP_DIR/backup_$DATE.log"

mkdir -p "$BACKUP_DIR"
pg_dump -U $USER -h $HOST $DB_NAME > "$BACKUP_DIR/$DB_NAME_$DATE.sql" 2> "$LOG_FILE"
find "$BACKUP_DIR" -type f -mtime +7 -name "*.sql" -exec rm -f {} \;
echo "Backup completed on $DATE" >> "$LOG_FILE"
