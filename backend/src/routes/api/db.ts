import { PrismaClient } from '@prisma/client';
import express from 'express';
import { Routes } from '../routes';

export class DBRoutes {
    public static readonly ENPOINT: string = `${Routes.BASE_ROUTE}/db`;

    constructor() {
        this._router = express.Router();
        this._prisma = new PrismaClient({
            log: [
                {
                    emit: 'event',
                    level: 'query',
                },
                {
                    emit: 'stdout',
                    level: 'info',
                },
                {
                    emit: 'stdout',
                    level: 'warn',
                },
            ],
        });

        this._router.get('/titles', async (req, res) => {
            try {
                this.getTitles()
                    .then((titles) => {
                        res.json(titles);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(async () => {
                        await this._prisma.$disconnect();
                    });
            } catch (error) {
                console.error(error);
            }
        });

        this._router.get('/genders', async (req, res) => {
            try {
                this.getGenders()
                    .then((genders) => {
                        res.json(genders);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(async () => {
                        await this._prisma.$disconnect();
                    });
            } catch (error) {
                console.error(error);
            }
        });

        this._router.get('/marital-statuses', async (req, res) => {
            try {
                this.getMaritalStatuses()
                    .then((maritalstatuses) => {
                        res.json(maritalstatuses);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(async () => {
                        await this._prisma.$disconnect();
                    });
            } catch (error) {
                console.error(error);
            }
        });

        this._router.get('/countries', async (req, res) => {
            try {
                this.getCountries()
                    .then((countries) => {
                        res.json(countries);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(async () => {
                        await this._prisma.$disconnect();
                    });
            } catch (error) {
                console.error(error);
            }
        });

        this._router.get('/occupation-industries', (req, res) => {
            try {
                this.getOccupationIndustries()
                    .then((occupationIndustries) => {
                        res.json(occupationIndustries);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(async () => {
                        await this._prisma.$disconnect();
                    });
            } catch (error) {
                console.error(error);
            }
        });

        //getOccupationsByIndustryId
        this._router.get('/occupations', (req, res) => {
            try {
                if (
                    req.query.industryid &&
                    typeof req.query.industryid === 'string'
                ) {
                    this.getOccupationsByIndustryId(
                        parseInt(req.query.industryid)
                    )
                        .then((occupations) => {
                            res.json(occupations);
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                        .finally(async () => {
                            await this._prisma.$disconnect();
                        });
                } else if (req.query.id && typeof req.query.id === 'string') {
                    this.getOccupationById(parseInt(req.query.id))
                        .then((occupation) => {
                            res.json(occupation);
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                        .finally(async () => {
                            await this._prisma.$disconnect();
                        });
                }
            } catch (error) {}
        });

        this._router.get('/organizations', (req, res) => {
            try {
                this.getOrganizations()
                    .then((organizations) => {
                        res.json(organizations);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(async () => {
                        await this._prisma.$disconnect();
                    });
            } catch (error) {
                console.error(error);
            }
        });
        this._router.get('/churchgroups', (req, res) => {
            try {
                this.getChurchGroups()
                    .then((churchGroups) => {
                        res.json(churchGroups);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(async () => {
                        await this._prisma.$disconnect();
                    });
            } catch (error) {
                console.error(error);
            }
        });
        this._router.get('/altarservers', (req, res) => {
            try {
                this.getAltarServers()
                    .then((alterServers) => {
                        res.json(alterServers);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(async () => {
                        await this._prisma.$disconnect();
                    });
            } catch (error) {
                console.error(error);
            }
        });
        this._router.get('/class-leaders', (req, res) => {
            try {
                this.getClassLeaders()
                    .then((classLeaders) => {
                        res.json(classLeaders);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(async () => {
                        await this._prisma.$disconnect();
                    });
            } catch (error) {
                console.error(error);
            }
        });

        this._router.get('/membership-statuses', (req, res) => {
            try {
                this.getMembershipStatuses()
                    .then((membershipStatuses) => {
                        res.json(membershipStatuses);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(async () => {
                        await this._prisma.$disconnect();
                    });
            } catch (error) {
                console.error(error);
            }
        });

        this._router.get('/members', (req, res) => {
            try {
                this.getMembers()
                    .then((members) => {
                        res.json(members);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(async () => {
                        await this._prisma.$disconnect();
                    });
            } catch (error) {
                console.error(error);
            }
        });
    }

    private _router: express.Router;
    private _prisma: PrismaClient;

    private async getGenders() {
        const genders = await this._prisma.members_genders.findMany();
        return genders;
    }

    private async getTitles() {
        const titles = await this._prisma.members_titles.findMany();
        return titles;
    }

    private async getMaritalStatuses() {
        const maritalStatuses = await this._prisma.members_marital_statuses.findMany();
        return maritalStatuses;
    }

    private async getCountries() {
        const countries = await this._prisma.countries.findMany({
            select: {
                country_id: true,
                country: true,
            },
            where: {
                country_id: {
                    gte: 1001,
                    lte: 1239,
                    //lte: 1187,
                },
            },
            orderBy: [
                {
                    country: 'asc',
                },
            ],
        });
        return countries;
    }

    private async getOccupationIndustries() {
        const occupationIndustries = await this._prisma.members_occupations_industries.findMany(
            {
                orderBy: [
                    {
                        name: 'asc',
                    },
                ],
            }
        );
        return occupationIndustries;
    }

    private async getOccupationsByIndustryId(industryId: number) {
        const occupations = await this._prisma.members_occupations.findMany({
            where: {
                industry_id: industryId,
            },
            orderBy: [
                {
                    name: 'asc',
                },
            ],
            /*include: {
                members_occupations_industries: true,
            },*/
        });

        return occupations;
    }
    private async getOccupationById(id: number) {
        const occupation = await this._prisma.members_occupations.findUnique({
            where: {
                id: id,
            },
            include: {
                members_occupations_industries: true,
            },
        });

        return occupation;
    }

    private async getOrganizations() {
        const organizations = await this._prisma.members_organizations.findMany(
            {
                orderBy: [
                    {
                        name: 'asc',
                    },
                ],
            }
        );
        return organizations;
    }
    private async getChurchGroups() {
        const churchGroups = await this._prisma.members_church_groups.findMany({
            orderBy: [
                {
                    name: 'asc',
                },
            ],
        });
        return churchGroups;
    }
    private async getAltarServers() {
        const alterServers = await this._prisma.members_altar_servers_types.findMany(
            {
                orderBy: [
                    {
                        name: 'asc',
                    },
                ],
            }
        );
        return alterServers;
    }

    private async getClassLeaders() {
        const classes = await this._prisma.members_class_leaders.findMany({
            /*orderBy: [{}],*/
            include: {
                class_leaders: true,
                assistant_class_leaders: true,
            },
        });
        return classes;
    }

    private async getMembershipStatuses() {
        const membershipStatuses = await this._prisma.members_membership_statuses.findMany(
            {
                orderBy: [
                    {
                        name: 'asc',
                    },
                ],
            }
        );
        return membershipStatuses;
    }

    private async getMembers() {
        const members = await this._prisma.members.findMany({
            orderBy: [
                {
                    lastname: 'asc',
                },
                {
                    firstname: 'asc',
                },
            ],
            include: {
                countries: true,
                members_genders: true,
                members_marital_statuses: true,
                members_membership_statuses: true,
                members_occupations: true,
                members_titles: true,
                members_classes: true,
                assistant_class_leaders: true,
                class_leaders: true,
            },
        });
        return members;
    }

    // getters and setters
    public get router(): express.Router {
        return this._router;
    }

    public get prisma(): PrismaClient {
        return this._prisma;
    }
    // getters and setters
}
