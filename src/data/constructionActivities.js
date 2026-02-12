const constructionActivities = {
    framing: {
        description: 'Work involving the framework of a structure, including walls, floors, and roofs.',
        tasks: [
            { subcategory: 'Framing Walls', description: 'Constructing the vertical structures that support the building.' },
            { subcategory: 'Floor Framing', description: 'Building the structure that supports the floors.' },
            { subcategory: 'Roof Framing', description: 'Constructing the support framework for the roof.' },
        ],
    },
    carpentry: {
        description: 'The trade of cutting, shaping, and installing building materials, mainly wood.',
        tasks: [
            { subcategory: 'Custom Cabinets', description: 'Building and installing cabinets tailored to the client’s specifications.' },
            { subcategory: 'Trim Installation', description: 'Fitting decorative trim around doors, windows, and floors.' },
            { subcategory: 'Furniture Making', description: 'Crafting custom furniture pieces for the project.' },
        ],
    },
    roofing: {
        description: 'The process of constructing a roof, including installation and repair.',
        tasks: [
            { subcategory: 'Shingle Installation', description: 'Applying shingles to the roof for waterproofing and aesthetic.' },
            { subcategory: 'Metal Roofing', description: 'Installing metal sheets as roofing material for durability.' },
            { subcategory: 'Roof Insulation', description: 'Adding insulation to improve energy efficiency.' },
        ],
    },
    electrical: {
        description: 'All work related to electrical systems, wiring, and installations.',
        tasks: [
            { subcategory: 'Wiring', description: 'Running electrical wires through the building.' },
            { subcategory: 'Lighting Installation', description: 'Installing fixtures and ensuring proper lighting.' },
            { subcategory: 'Electrical Panel Setup', description: 'Setting up the main electrical distribution box.' },
        ],
    },
    plumbing: {
        description: 'The installation and maintenance of piping systems, fixtures, and appliances.',
        tasks: [
            { subcategory: 'Pipe Installation', description: 'Installing and connecting pipes for water and waste.' },
            { subcategory: 'Fixture Installation', description: 'Installing sinks, toilets, and other plumbing fixtures.' },
            { subcategory: 'Drainage Systems', description: 'Setting up systems for removing waste water.' },
        ],
    },
    masonry: {
        description: 'Building structures from individual units, usually bricks, stones, or concrete blocks.',
        tasks: [
            { subcategory: 'Brickwork', description: 'Laying bricks to build walls and structures.' },
            { subcategory: 'Stone Masonry', description: 'Using stone to create durable structures.' },
            { subcategory: 'Concrete Block Walls', description: 'Constructing walls using concrete blocks.' },
        ],
    },
    finishing: {
        description: 'Final touches and details that improve the appearance and functionality of spaces.',
        tasks: [
            { subcategory: 'Painting', description: 'Applying paint to walls for aesthetic appeal.' },
            { subcategory: 'Flooring Installation', description: 'Installing final flooring materials like wood, tile, or carpet.' },
            { subcategory: 'Fixture Finalization', description: 'Installing final fixtures like handles and light switches.' },
        ],
    },
    landscaping: {
        description: 'Design and maintenance of outdoor areas, including planting and architecture.',
        tasks: [
            { subcategory: 'Planting', description: 'Selecting and planting trees, shrubs, and flowers.' },
            { subcategory: 'Hardscaping', description: 'Installing non-plant elements like patios, walkways, and walls.' },
            { subcategory: 'Irrigation Systems', description: 'Setting up systems for watering plants effectively.' },
        ],
    },
};

export default constructionActivities;