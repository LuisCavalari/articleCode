module.exports = {
    recursiveQuery: (id) => `WITH RECURSIVE subcategories (id) AS (
        SELECT id FROM public."Categories" WHERE id = ${id}
        UNION ALL
        SELECT c.id from subcategories, public."Categories" c
        WHERE c.parent_id = subcategories.id
        ) select id from subcategories; `
}