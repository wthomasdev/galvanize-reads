exports.up = function(knex, Promise) {
		return knex.schema.createTable('genre', function(table) {
			table.increments();
			table.string('genre')
		}).then(function(table) {
			return knex.schema.createTable('book', function(table) {
				table.increments();
				table.string('title').notNullable();
				table.integer('book_genre').references('id').inTable('genre').onDelete('cascade');
				table.text('book_description').notNullable();
				table.string('book_cover_url');
			}).then(function(table) {
				return knex.schema.createTable('author', function(table) {
					table.increments();
					table.string('first_name').notNullable();
					table.string('last_name').notNullable();
					table.text('biography').notNullable();
					table.string('author_portrait_url');
				}).then(function(table) {
					return knex.schema.createTable('book_author', function(table) {
						table.increments();
						table.integer('book_id').references('id').inTable('book').onDelete('cascade');
						table.integer('author_id').references('id').inTable('author').onDelete('cascade');
					});
				});
			});
    });
		};

		exports.down = function(knex, Promise) {
			return knex.schema.dropTableIfExists('book_author').then(function() {
				return knex.schema.dropTableIfExists('author')
			}).then(function() {
				return
				knex.schema.dropTableIfExists('book')
			}).then(function() {
				return knex.schema.dropTableIfExists('genre')
			})
		};
