const { gql } = require('apollo-server');

const typeDefs = gql`
	type User @key(fields: "id") {
		"""
		Unique ID of user.
		"""
		id: ID!
		first_name: String!
		last_name: String!
		email: String!
		city: String!
		"""
		Chosen from a list of States and Regions on Front end
		"""
		state: String!
		"""
		Industry is an object with ID and String
		"""
		industries: [Industry!]!
		image_url: String
		gender: String
		# resumes: [String]
		personal_url: String
		blog_url: String
		twitter_url: String
		portfolio_url: String
		linkedin_url: String
		github_url: String
		bio: String
		payment_info: Boolean
	}

	type Query {
		"""
		A test query to show that the backend works
		"""
		info: String!

		"""
		Gets all registered users
		"""
		users: [User!]!

		"""
		Gets user by ID
		"""
		user(
			"""
			Unique ID
			"""
			id: ID!
		): User!

		"""
		Gets user info based on credentials stored in token
		"""
		me: User!

		"""
		Gets a list of industries and users within that industry
		"""
		industries: [Industry!]!
	}

	type Industry {
		id: ID!

		"""
		Industry name. Unique
		"""
		name: String!

		"""
		Users signed up for that industry
		"""
		users: [User!]!
	}

	type Mutation {
		"""
		Register user. Requires unique email. No empty strings cannot be passed in.
		"""
		signup(
			first_name: String!
			last_name: String!
			email: String!
			password: String!
			city: String!
			state: String!

			"""
			Industry's ID
			"""
			industry: ID!
			image_url: String
			gender: String
			personal_url: String
			blog_url: String
			twitter_url: String
			portfolio_url: String
			linkedin_url: String
			github_url: String
			bio: String
			payment_info: Boolean
		): AuthPayload!

		"""
		Logins in user and returns a token and user info if successful.
		"""
		login(email: String!, password: String!): AuthPayload!

		"""
		Updates user info. No empty strings cannot be passed in
		"""
		update(
			first_name: String
			last_name: String
			password: String
			email: String
			city: String
			state: String
			# industry: [String]!
			image_url: String
			gender: String
			# resumes: [String]
			personal_url: String
			blog_url: String
			twitter_url: String
			portfolio_url: String
			linkedin_url: String
			github_url: String
			bio: String
			payment_info: Boolean
		): User!

		"""
		Should be deprecated
		"""
		postIndustry(name: String!): Industry!

		"""
		Connects user with industry
		"""
		postIndustryToUser(
			"""
			Industry ID
			"""
			industry_id: ID!
		): Industry!

		"""
		Removes connection
		"""
		deleteIndustryFromUser(
			"""
			Industry ID
			"""
			industry_id: ID!
		): Industry!

		"""
		Delete user info
		"""
		deleteUser: User!
	}

	"""
	Used for log in and sign up. Returns token and user info
	"""
	type AuthPayload {
		token: String!
		user: User!
	}
`;

module.exports = typeDefs;
