USE definitions;

-- add missing title column to dashboards
ALTER TABLE dashboards
  ADD COLUMN title VARCHAR(255) NOT NULL;
