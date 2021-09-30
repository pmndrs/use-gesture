import { DefaultElements, MakeRequest, MetaLinkProps, MetaSysProps } from '../common-types';
export declare type OrganizationInvitationProps = {
    sys: MetaSysProps & {
        organizationMembership: {
            sys: MetaLinkProps;
        };
        user: Record<string, any> | null;
        invitationUrl: string;
        status: string;
    };
    firstName: string;
    lastName: string;
    email: string;
    role: string;
};
export declare type CreateOrganizationInvitationProps = Omit<OrganizationInvitationProps, 'sys'>;
export interface OrganizationInvitation extends OrganizationInvitationProps, DefaultElements<OrganizationInvitationProps> {
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw invitation data
 * @return {OrganizationInvitation} Wrapped Inviation data
 */
export declare function wrapOrganizationInvitation(_makeRequest: MakeRequest, data: OrganizationInvitationProps): OrganizationInvitation;
