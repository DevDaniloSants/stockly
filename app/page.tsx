import Header, {
    HeaderLeft,
    HeaderSubtitle,
    HeaderTitle,
} from './_components/header'

const Home = () => {
    return (
        <div className="roundend-lg m-8 w-full space-y-8 bg-white px-8 py-8">
            <Header>
                <HeaderLeft>
                    <HeaderSubtitle>Dashboard</HeaderSubtitle>
                    <HeaderTitle>Dashboard</HeaderTitle>
                </HeaderLeft>
            </Header>
        </div>
    )
}

export default Home
