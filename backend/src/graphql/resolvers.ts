import { PrismaClient } from '@prisma/client';
import { GraphQLDate } from 'graphql-iso-date';

// Provide resolver functions for your schema fields
export const resolvers = {
    Query: {
        members_altar_servers_types: async (
            parent: any,
            args: any,
            context: any
        ) => {
            const prisma: PrismaClient = context.prisma;
            return await prisma.members_altar_servers_types.findMany({
                orderBy: [
                    {
                        name: 'asc',
                    },
                ],
            });
        },
        members_church_groups: async (parent: any, args: any, context: any) => {
            const prisma: PrismaClient = context.prisma;
            return await prisma.members_church_groups.findMany({
                orderBy: [
                    {
                        name: 'asc',
                    },
                ],
            });
        },
        members_class_leaders: async (parent: any, args: any, context: any) => {
            const prisma: PrismaClient = context.prisma;
            return await prisma.members_class_leaders.findMany({
                orderBy: [
                    {
                        class_name: 'asc',
                    },
                ],
                include: {
                    class_leaders: true,
                    assistant_class_leaders: true,
                },
            });
        },
        countries: async (parent: any, args: any, context: any) => {
            const prisma: PrismaClient = context.prisma;
            return await prisma.countries.findMany({
                orderBy: [
                    {
                        country: 'asc',
                    },
                ],
            });
        },
        members_genders: async (parent: any, args: any, context: any) => {
            const prisma: PrismaClient = context.prisma;
            return await prisma.members_genders.findMany({
                orderBy: [
                    {
                        name: 'asc',
                    },
                ],
            });
        },
        members_marital_statuses: async (
            parent: any,
            args: any,
            context: any
        ) => {
            const prisma: PrismaClient = context.prisma;
            return await prisma.members_marital_statuses.findMany({
                orderBy: [
                    {
                        name: 'asc',
                    },
                ],
            });
        },
        members_membership_statuses: async (
            parent: any,
            args: any,
            context: any
        ) => {
            const prisma: PrismaClient = context.prisma;
            return await prisma.members_membership_statuses.findMany({
                orderBy: [
                    {
                        name: 'asc',
                    },
                ],
            });
        },
        members_occupations_industries: async (
            parent: any,
            args: any,
            context: any
        ) => {
            const prisma: PrismaClient = context.prisma;

            return await prisma.members_occupations_industries.findMany({
                orderBy: [
                    {
                        name: 'asc',
                    },
                ],
            });
        },
        members_occupation_by_id: async (
            parent: any,
            args: any,
            context: any
        ) => {
            const prisma: PrismaClient = context.prisma;
            const id: number = parseInt(args.id);

            return await prisma.members_occupations.findUnique({
                where: {
                    id: id,
                },
                include: {
                    members_occupations_industries: true,
                },
            });
        },
        members_occupations_by_industry: async (
            parent: any,
            args: any,
            context: any
        ) => {
            const prisma: PrismaClient = context.prisma;
            const industry_id: number = parseInt(args.industry_id);

            return await prisma.members_occupations.findMany({
                where: {
                    industry_id: industry_id,
                },
                include: {
                    members_occupations_industries: true,
                },
                orderBy: [
                    {
                        name: 'asc',
                    },
                ],
            });
        },
        members_organizations: async (parent: any, args: any, context: any) => {
            const prisma: PrismaClient = context.prisma;
            return await prisma.members_organizations.findMany({
                orderBy: [
                    {
                        name: 'asc',
                    },
                ],
            });
        },
        members_titles: async (parent: any, args: any, context: any) => {
            const prisma: PrismaClient = context.prisma;
            return await prisma.members_titles.findMany({
                orderBy: [
                    {
                        title: 'asc',
                    },
                ],
            });
        },
        payments_currencies: async (parent: any, args: any, context: any) => {
            const prisma: PrismaClient = context.prisma;
            return await prisma.payments_currencies.findMany({
                orderBy: [
                    {
                        currency: 'asc',
                    },
                ],
            });
        },
        payments_types: async (parent: any, args: any, context: any) => {
            const prisma: PrismaClient = context.prisma;
            return await prisma.payments_types.findMany({
                orderBy: [
                    {
                        name: 'asc',
                    },
                ],
            });
        },

        members: async (parent: any, args: any, context: any) => {
            const prisma: PrismaClient = context.prisma;
            return await prisma.members.findMany({
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
                    members_occupations: {
                        include: {
                            members_occupations_industries: true,
                        },
                    },
                    members_titles: true,
                    members_classes: true,
                    assistant_class_leaders: true,
                    class_leaders: true,
                    members_organizations_associations: {
                        include: {
                            members_organizations: true,
                        },
                    },
                    members_church_groups_associations: {
                        include: {
                            members_church_groups: true,
                        },
                    },
                    members_altar_servers_types_associations: {
                        include: {
                            members_altar_servers_types: true,
                        },
                    },
                },
            });
        },

        members_by_name: async (parent: any, args: any, context: any) => {
            const prisma: PrismaClient = context.prisma;
            const name: string = args.name;

            return await prisma.members.findMany({
                where: {
                    OR: [
                        {
                            firstname: {
                                contains: name,
                            },
                        },
                        {
                            lastname: {
                                contains: name,
                            },
                        },
                        {
                            othernames: {
                                contains: name,
                            },
                        },
                    ],
                },
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
                    members_occupations: {
                        include: {
                            members_occupations_industries: true,
                        },
                    },
                    members_titles: true,
                    members_classes: true,
                    assistant_class_leaders: true,
                    class_leaders: true,
                    members_organizations_associations: {
                        include: {
                            members_organizations: true,
                        },
                    },
                    members_church_groups_associations: {
                        include: {
                            members_church_groups: true,
                        },
                    },
                    members_altar_servers_types_associations: {
                        include: {
                            members_altar_servers_types: true,
                        },
                    },
                },
            });
        },
        members_tithes_payments: async (
            parent: any,
            args: any,
            context: any
        ) => {
            const prisma: PrismaClient = context.prisma;
            return await prisma.members_tithes_payments.findMany({
                include: {
                    members: {},
                    payments_currencies: {},
                    payments_types: {},
                },
            });
        },
        members_tithes_payments_by_date: async (
            parent: any,
            args: any,
            context: any
        ) => {
            const prisma: PrismaClient = context.prisma;
            const payment_date: Date = new Date(args.payment_date);
            return await prisma.members_tithes_payments.findMany({
                where: {
                    payment_date: payment_date,
                },
                //orderBy: [{}],
                include: {
                    members: {},
                    payments_currencies: {},
                    payments_types: {},
                },
            });
        },
    },
};
