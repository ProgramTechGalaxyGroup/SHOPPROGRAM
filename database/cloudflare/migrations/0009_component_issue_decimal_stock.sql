-- Allow component stock to use decimal quantities and allow stock issue lines
-- to reference either products or components.

ALTER TABLE stock_issue_items ADD COLUMN item_type TEXT NOT NULL DEFAULT 'product';
ALTER TABLE stock_issue_items ADD COLUMN component_id TEXT;

CREATE INDEX IF NOT EXISTS idx_issue_items_component ON stock_issue_items(component_id);
