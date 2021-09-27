import MainMenu from "./ui/menu/MainMenu";
import MapStorage from "./logic/storage/MapStorage";
import TravelClub from "../step1/entity/club/TravelClub";
import CommunityMember from "../step1/entity/club/CommunityMember";
import SocialBoard from "../step1/entity/board/SocialBoard";


MapStorage.getInstance().clubMap.set(TravelClub.getSample(true).getId(), TravelClub.getSample(true));
MapStorage.getInstance().memberMap.set(CommunityMember.getSample().email, CommunityMember.getSample());
MapStorage.getInstance().boardMap.set(SocialBoard.getSample(TravelClub.getSample(true)).getId(), SocialBoard.getSample(TravelClub.getSample(true)));

new MainMenu().showMenu();