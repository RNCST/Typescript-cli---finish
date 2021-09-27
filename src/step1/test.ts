import TravelClub from "./entity/club/TravelClub";
import CommunityMember from "./entity/club/CommunityMember";
import ClubMembership from "./entity/club/ClubMembership";
import SocialBoard from "./entity/board/SocialBoard";
import Posting from "./entity/board/Posting";

const club = TravelClub.getSample(true);

const member = CommunityMember.getSample();

const membership = ClubMembership.getSample(club, member);

const board = SocialBoard.getSample(club);

const postings = Posting.getSample(board);

console.log(club);
console.log(member);
console.log(membership);
console.log(board);
console.log(postings.map(posting => posting));

