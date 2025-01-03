SELECT
    p.id,
    p.title,
    p.post_type,
    json_agg(
        json_build_object(
            'id', t.id,
            'name', t.name
        )
    ) AS "tags"
FROM 
    post p
LEFT JOIN 
    post_tags_tag pt ON p.id = pt."postId"
LEFT JOIN 
    tag t ON pt."tagId" = t.id
GROUP BY 
    p.id;


-- without json_agg
SELECT
    p.id,
    p.title,
    p.post_type,
    t.id,
    t.name,
    t.slug
FROM 
    post p
LEFT JOIN 
    post_tags_tag pt ON p.id = pt."postId"
LEFT JOIN 
    tag t ON pt."tagId" = t.id
GROUP BY 
    p.id, t.id;
